import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNotes } from '../../context/NoteContext';
import { Note } from '../../types/note';

export default function HomeScreen() {
  const router = useRouter();
  const { notes } = useNotes();

  const navigateToNewNote = () => {
    router.push('/new-note'); // Navigate to the new note screen
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
      <View style={styles.noteTags}>
        {item.tags.map((tag, index) => (
          <Text key={index} style={styles.noteTag}>#{tag}</Text>
        ))}
      </View>
      <Text style={styles.noteDate}>
        {new Date(item.updatedAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="sticky-note" size={32} color="#007AFF" />
        <Text style={styles.headerText}>My Notes</Text>
        <TouchableOpacity onPress={navigateToNewNote}>
          <FontAwesome name="plus-circle" size={25} color="#007AFF" style={styles.composeIcon} />
        </TouchableOpacity>
      </View>
      
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.noteList}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome name="file-text-o" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No notes yet</Text>
          <Text style={styles.emptyStateSubText}>
            Create your first note by tapping the + button below
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#333333",
    flex: 1,
  },
  composeIcon: {
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333333",
  },
  emptyStateSubText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 8,
    maxWidth: 250,
  },
  noteList: {
    padding: 16,
  },
  noteItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  noteTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  noteTag: {
    fontSize: 12,
    color: "#007AFF",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: "#999999",
    textAlign: "right",
  },
});
