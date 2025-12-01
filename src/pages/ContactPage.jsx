import PageContent from "../components/PageContent";
import ContactForm from "../components/ContactForm";

function ContactPage() {
  return (
    <PageContent title="Contact">
      <p style={{ marginTop: "-.25rem", opacity: 0.9 }}>
        Questions, feedback, or feature ideas? Drop us a note below.
      </p>
      <ContactForm />
    </PageContent>
  );
}

export default ContactPage;
