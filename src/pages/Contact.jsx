import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ShinyText from '../components/Ui/ShinyText';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding-top: var(--header-height);
`;

const HeroSection = styled.section`
  background: var(--bg-secondary);
  padding: 1rem 0;
  position: relative;
  overflow: hidden;
  margin-bottom: 0;

  h1 {
    font-size: clamp(3.5rem, 10vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
    text-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 4rem;
    opacity: 0.9;
    max-width: 700px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ContactSection = styled.section`
  padding: 8rem 0;
  background: var(--bg-primary);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  margin-top: 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactForm = styled.form`
  background: var(--bg-tertiary);
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormLabel = styled.div`
  display: block;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(201, 168, 124, 0.1);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 180px;
  resize: none;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(201, 168, 124, 0.1);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--accent);
  color: var(--bg-primary);
  border: 2px solid var(--accent);
  padding: 1.2rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;
  width: 100%;

  &:hover {
    background: transparent;
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
  }
`;

const InfoItem = styled(motion.div)`
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-5px);
    box-shadow: var(--shadow);
  }

  h4 {
    color: var(--accent);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 1.1rem;
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent);
    }
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--accent) !important;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent);
    color: var(--bg-primary) !important;
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: var(--bg-secondary);
  color: var(--accent);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid var(--accent);
  text-align: center;
  font-weight: 500;
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must not exceed 100 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailJSInitialized, setIsEmailJSInitialized] = useState(false);

  useEffect(() => {
    const initializeEmailJS = async () => {
      try {
        if (!EMAILJS_CONFIG.PUBLIC_KEY) {
          throw new Error('EmailJS Public Key is missing');
        }

        await emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
        setIsEmailJSInitialized(true);
      } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
        toast.error('Failed to initialize email service. Please try again later.');
      }
    };

    initializeEmailJS();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (!isEmailJSInitialized) {
      toast.error('Email service is not properly configured');
      return;
    }

    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      toast.error('Email service configuration is missing');
      return;
    }

    setIsSubmitting(true);
    const submitPromise = new Promise(async (resolve, reject) => {
      try {
        const templateParams = {
          from_name: values.name,
          from_email: values.email,
          to_name: 'Vatsal Acharya Architects',
          subject: values.subject,
          message: values.message
        };

        console.log('Sending email with params:', templateParams);

        const response = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams
        );

        console.log('EmailJS response:', response);

        if (response.status === 200) {
          resetForm();
          resolve('Message sent successfully! We will get back to you soon.');
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        reject(error.message || 'Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    });

    toast.promise(submitPromise, {
      loading: 'Sending message...',
      success: (message) => message,
      error: (error) => error,
    });
  };

  return (
    <PageContainer>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          },
          success: {
            iconTheme: {
              primary: 'var(--accent)',
              secondary: 'var(--bg-primary)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4d4f',
              secondary: 'var(--bg-primary)',
            },
          },
        }}
      />
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1><ShinyText text="Contact Us" disabled={false} speed={3} className='custom-class' /></h1>
            <p style={{ 
              fontSize: '1.25rem', 
              maxWidth: '800px', 
              marginTop: '1.5rem',
              lineHeight: '1.6'
            }}>
              Get in touch with us to discuss your project or any inquiries you may have.
              We're here to help bring your architectural vision to life.
            </p>
          </motion.div>
        </Container>
      </HeroSection>

      <ContactSection>
        <Container>
          <ContactGrid>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <ContactForm as={Form}>
                    <FormGroup>
                      <FormLabel>Name</FormLabel>
                      <Field
                        as={Input}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        autoComplete="off"
                      />
                      <ErrorMessage name="name" component={ErrorText} />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Email</FormLabel>
                      <Field
                        as={Input}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email address"
                        autoComplete="off"
                      />
                      <ErrorMessage name="email" component={ErrorText} />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Subject</FormLabel>
                      <Field
                        as={Input}
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        autoComplete="off"
                      />
                      <ErrorMessage name="subject" component={ErrorText} />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Message</FormLabel>
                      <Field
                        as={TextArea}
                        id="message"
                        name="message"
                        placeholder="Tell us about your project..."
                        autoComplete="off"
                      />
                      <ErrorMessage name="message" component={ErrorText} />
                    </FormGroup>

                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </SubmitButton>
                  </ContactForm>
                )}
              </Formik>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ContactInfo>
                <h3>Get in Touch</h3>
                <InfoItem
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>Office Location</h4>
                  <p>
                    Sompura Society, Rajwadi<br />
                    Palitana, Gujarat<br />
                    India
                  </p>
                  <MapLink href="https://maps.app.goo.gl/oCTZ7tMRWp37guYbA" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                    </svg>
                    View on Google Maps
                  </MapLink>
                </InfoItem>

                <InfoItem
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>Contact Details</h4>
                  <p>
                    <a href="tel:+918511189224">+91 8511189224</a><br />
                    <a href="mailto:vatsalacharya82@gmail.com">vatsalacharya82@gmail.com</a>
                  </p>
                </InfoItem>

                <InfoItem
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>Business Hours</h4>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </InfoItem>
              </ContactInfo>
            </motion.div>
          </ContactGrid>
        </Container>
      </ContactSection>
    </PageContainer>
  );
};
