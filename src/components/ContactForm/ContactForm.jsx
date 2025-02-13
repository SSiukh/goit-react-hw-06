import { useId } from "react";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact, setIsExist } from "../../redux/contactsSlice";

const ContactForm = () => {
  const usernameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const isExistError = useSelector((state) => state.contacts.errors.isExist);

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required()
      .trim(),
    number: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required()
      .trim(),
  });

  const handleSubmit = (values, actions) => {
    const isExist = contacts.some(
      ({ name, number }) => name === values.name || number === values.number
    );
    if (isExist) {
      dispatch(setIsExist(isExist));
      return;
    }
    dispatch(setIsExist(false));

    const contact = { ...values, id: nanoid() };
    dispatch(addContact(contact));
    actions.resetForm();
  };

  return (
    <div className={s.container}>
      {isExistError && (
        <p className={s.existError}>
          Сontact with such number or name has already exist
        </p>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor={usernameId}>
            Name
          </label>
          <Field className={s.input} id={usernameId} name="name" />
          <ErrorMessage className={s.error} component="span" name="name" />
          <label className={s.label} htmlFor={numberId}>
            Number
          </label>
          <Field className={s.input} id={numberId} name="number" type="tel" />
          <ErrorMessage className={s.error} component="span" name="number" />
          <button className={s.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
