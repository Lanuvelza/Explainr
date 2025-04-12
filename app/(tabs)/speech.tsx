import { TouchableOpacity } from 'react-native';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './speech.styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Speech() {
  const { isRecording, transcription, error, startRecording, stopRecording, clearTranscript } = useSpeechRecognition();
  const styles = createStyles();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Speech Recognition</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <TouchableOpacity 
          style={[styles.button, isRecording ? styles.stopButton : styles.startButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Ionicons 
            name={isRecording ? "stop-circle" : "mic"} 
            size={24} 
            color="white" 
          />
          <ThemedText style={styles.buttonText}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </ThemedText>
        </TouchableOpacity>

        {error ? (
          <ThemedView style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#FF5252" />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        ) : null}

        <ThemedView style={styles.statusContainer}>
          <Ionicons 
            name={isRecording ? "radio-button-on" : "radio-button-off"} 
            size={16} 
            color={isRecording ? "#4CAF50" : "#999"} 
          />
          <ThemedText style={styles.statusText}>
            {isRecording ? "Recording..." : "Ready to record"}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.transcriptionContainer}>
          <ThemedView style={styles.transcriptionHeader}>
            <ThemedText type="subtitle" style={styles.transcriptionTitle}>Transcript</ThemedText>
            {transcription ? (
              <TouchableOpacity onPress={clearTranscript} style={styles.clearButton}>
                <Ionicons 
                  name="trash-outline" 
                  size={20} 
                  color="#000000" 
                />
              </TouchableOpacity>
            ) : null}
          </ThemedView>
          <ThemedView style={styles.transcriptionBox}>
            <ThemedText style={styles.transcriptionText}>
              {transcription || 'No transcription yet'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

