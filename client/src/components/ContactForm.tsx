import React from "react";
import emailjs from "@emailjs/browser";
import "semantic-ui-css/semantic.min.css";

import { Form, Input, TextArea, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
const SERVICE_ID = "service_5fm3jp5";
const TEMPLATE_ID = "template_x8hpxjp";
const PUBLIC_KEY = "9zTePLfgGlWR77fhS";

function ContactForm() {
  const handleOnSubmit = (
    e: any
    // React.BaseSyntheticEvent<Event, EventTarget & HTMLFormElement, EventTarget>
  ) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID!, e.target, PUBLIC_KEY).then(
      (result: { text: string }) => {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error: { text: string }) => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };
  return (
    <div className="contact-form-wrap" id="#navigateHere">
      <Form onSubmit={handleOnSubmit}>
        <Form.Field
          id="form-input-control-email"
          control={Input}
          label="Email"
          name="user_email"
          placeholder="Email…"
          required
          icon="mail"
          iconPosition="left"
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Name"
          name="user_name"
          placeholder="Name…"
          required
          icon="user circle"
          iconPosition="left"
        />
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Message"
          name="user_message"
          placeholder="Message…"
          required
        />
        <Button type="submit" color="green">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;
