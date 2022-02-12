import React, { useState,} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  min-height: 75vh;
  max-width: 95vw;
  margin: 0 auto 0 auto;
  background-color: var(--color-8);
  padding: 1rem;

  & input,
  & textarea {
    background-color: var(--color-5);
    padding: 5px;
    font-size: 0.85rem;
  }
  & br {
    margin-bottom: 3px;
  }

  @media screen and (min-width: 700px) {
    min-height: 65vh;
  }
  @media screen and (min-width: 1400px) {
    min-height: 62vh;
  }
`;

const FormContentWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: auto auto auto auto;
  padding: 0.75rem !important;
  font-weight: 700;
  border: none;
  color: var(--color-black);
  @media screen and (min-width: 500px) {
    width: 25%;
  }
  @media screen and (min-width: 1000px) {
    width: 20%;
  }
  @media screen and (min-width: 1600px) {
    width: 15%;
  }
`;

const FormInput = styled.input`
  width: 100%;
  transition: all 0.2s;
  border: 3px transparent solid;
  &:focus {
    outline: none;
    border-bottom: 3px var(--color-7) solid;
    &::after {
    }
  }
`;

const TextArea = styled.input`
  height: 25vh;
  width: 100%;
  transition: all 0.2s;
  border: 3px transparent solid;
  &:focus {
    outline: none;
    border-bottom: 3px var(--color-7) solid;
  }
`;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();



  const onSubmit = (data) => {
    console.log(data)
    console.log(`Submitted form data: 
        Name: ${name}
        subject: ${subject}
        email: ${email}
        message: ${message}`);
    // function runs after successful validation and actually send email
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <FormContentWrapper>
        <FormEntry>
          Name
          <br />
          <FormInput
            type="text"
            required
            value={name}
            autoFocus
            {...register("name", { required: true })}
            onChange={(e) => handleFormChange(e, "name")}
            
          ></FormInput>
        </FormEntry>
        <FormEntry>
          Subject
          <br />
          <FormInput
            type="text"
            required
            value={subject}
            {...register("subject", { required: true })}
            onChange={(e) => handleFormChange(e, "subject")}
            
          ></FormInput>
        </FormEntry>
        <FormEntry>
          Email
          <br />
          <FormInput
            type="text"
            required
            value={email}
            {...register("email", { required: true })}
            onChange={(e) => handleFormChange(e, "email")}
          ></FormInput>
          {errors.emailRequired && <p>This field is required</p>}
        </FormEntry>
        <FormEntry>
          Message
          <br />
          <TextArea
          type="textarea"
            value={message}
            {...register("message", { required: true })}
            onChange={(e) => handleFormChange(e, "message")}
          />
          {errors.messageRequired && <p>This field is required</p>}
        </FormEntry>
        <SubmitButton
          type="submit"
          required
          value="Submit"
          onSubmit={handleSubmit}
        ></SubmitButton>
      </FormContentWrapper>
    </Form>
  );
}
