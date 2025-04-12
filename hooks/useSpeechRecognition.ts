import { useState, useEffect, useRef } from 'react';

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setTranscription('');
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscription(prev => prev + ' ' + finalTranscript);
          setError('');
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access in your browser settings.');
        } else {
          setError('Speech recognition error: ' + event.error);
        }
        setIsRecording(false);
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError('');
      if (recognitionRef.current) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          recognitionRef.current.start();
        } catch (err) {
          setError('Microphone access denied. Please allow microphone access in your browser settings.');
          setIsRecording(false);
        }
      } else {
        setError('Speech recognition not initialized');
      }
    } catch (err) {
      setError('Failed to start recording');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (err) {
      setError('Failed to stop recording');
    }
  };

  const clearTranscript = () => {
    setTranscription('');
  };

  return {
    isRecording,
    transcription,
    error,
    startRecording,
    stopRecording,
    clearTranscript,
  };
}