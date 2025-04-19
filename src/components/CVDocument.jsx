import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    color: "#333",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
  },
  contactText: {
    marginRight: 5,
  },
  link: {
    color: "#333",
    textDecoration: "none",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderBottomStyle: "solid",
    marginTop: 5,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  educationItem: {
    marginBottom: 4,
  },
  educationName: {
    fontSize: 11,
    fontWeight: "bold",
  },
  educationDetail: {
    fontSize: 10,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 10,
    textAlign: "right",
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 8,
  },
  projectSubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  achievementItem: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
});

const CVDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>{data.phone}</Text>
          <Text style={styles.contactText}>{data.email}</Text>
          {data.linkedin && (
            <Text style={styles.contactText}>
              <Text style={styles.link}>LinkedIn profile</Text>
            </Text>
          )}
          {data.github && (
            <Text style={styles.contactText}>
              <Text style={styles.link}>GitHub account</Text>
            </Text>
          )}
        </View>
        <View style={styles.divider} />
      </View>

      {/* Education Section */}
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.sectionHeader}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.row}>
            <View style={styles.educationItem}>
              <Text style={styles.educationName}>{edu.institution}</Text>
              <Text style={styles.educationDetail}>CGPA: {edu.gpa}</Text>
            </View>
            <Text style={styles.dateText}>{edu.period}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Projects Section */}
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.sectionHeader}>Projects</Text>
        {data.projects.map((project, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Text style={styles.projectTitle}>{project.name}</Text>

            {project.components.map((component, j) => (
              <View key={j} style={{ marginBottom: 5 }}>
                <Text style={styles.projectSubtitle}>{component.title}</Text>
                <Text style={styles.projectDescription}>
                  {component.description}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Achievements Section */}
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.sectionHeader}>Achievements</Text>
        {data.achievements.map((achievement, i) => (
          <Text key={i} style={styles.achievementItem}>
            {achievement.title}: {achievement.description}
          </Text>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Skills Section */}
      <View>
        <Text style={styles.sectionHeader}>Skills</Text>
        {data.skills.map((skillGroup, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <Text style={styles.skillCategory}>{skillGroup.category}:</Text>
            <Text style={styles.skillItem}>{skillGroup.items.join(", ")}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CVDocument;
