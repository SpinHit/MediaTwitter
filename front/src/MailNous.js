import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


// Forumulaire de propostions de media

export default function MailNous() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // envoie du formulaire avec emailjs
    emailjs.sendForm('service_a03mohk', 'template_nwz1pie', form.current, 'vhTwFlkAlrCbi-Ch4')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    // on vide le formulaire et on fait remonter la page
    window.scroll(0, 0);
    e.target.reset();
  };

  return (
    <form className='FormMail' ref={form} onSubmit={sendEmail}>
      <label>Des Medias à nous proposer ? </label>
      <textarea name="message" />
      <input type="submit" value="Envoyer" />
    </form>
  );
}
