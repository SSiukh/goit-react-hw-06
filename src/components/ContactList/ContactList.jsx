import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);
  const keyword = useSelector((state) => state.filters.name);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.includes(keyword)
  );

  return (
    <div className={s.list}>
      {filteredContacts.map(({ id, name, number }) => {
        return <Contact key={id} name={name} number={number} id={id} />;
      })}
    </div>
  );
};

export default ContactList;
