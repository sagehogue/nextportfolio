import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  min-height: 75vh;
  background-color: var(--color-5);
  padding: 0.75rem;
  & input {
  }
  & input,
  & textarea {
    background-color: var(--color-7);
    border: none;
    padding: 5px;
  }
  & br {
    margin-bottom: 3px;
  }
`;

const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
  margin-bottom: auto;
`;

const FormEntry = styled.label`
  display: block;
  font-weight: 600;
  width: 90%;
  margin: 0 auto 0.75rem auto;
`;

const SubmitButton = styled.input`
  background-color: var(--color-2) !important;
  width: 45%;
  margin: 1.5rem auto 0 auto;
  padding: 0.75rem !important;
  font-weight: 700;
`;

const FormInput = styled.input`
  width: 100%;
`;

const TextArea = styled.textarea`
  height: 25vh;
  width: 100%;
  //   margin: 0 auto 0 auto;
`;

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted form data: 
        Name: ${name}
        subject: ${subject}
        email: ${email}
        message: ${message}`);
  };
  let [name, setName] = useState("");
  let [subject, setSubject] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

  const handleFormChange = (e, state) => {
    switch (state) {
      case "name":
        setName(e.target.value);
        break;
      case "subject":
        setSubject(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "message":
        setMessage(e.target.value);
        break;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormContentWrapper>
        <FormEntry>
          Name
          <br />
          <FormInput
            type="text"
            value={name}
            onChange={(e) => handleFormChange(e, "name")}
          ></FormInput>
        </FormEntry>
        <FormEntry>
          Subject
          <br />
          <FormInput
            type="text"
            value={subject}
            onChange={(e) => handleFormChange(e, "subject")}
          ></FormInput>
        </FormEntry>
        <FormEntry>
          Email
          <br />
          <FormInput
            type="text"
            value={email}
            onChange={(e) => handleFormChange(e, "email")}
          ></FormInput>
        </FormEntry>
        <FormEntry>
          Message
          <br />
          <TextArea
            value={message}
            onChange={(e) => handleFormChange(e, "message")}
          />
        </FormEntry>
        <SubmitButton
          type="submit"
          value="Submit"
          onSubmit={handleSubmit}
        ></SubmitButton>
      </FormContentWrapper>
    </Form>
  );
}
