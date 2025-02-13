import s from "./Contact.module.css";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.contact}>
      <div className={s.info}>
        <div className={s.block}>
          <FaUser className={s.userIcon} />
          <p className={s.text}>{name}</p>
        </div>
        <div className={s.block}>
          <FaPhoneAlt className={s.telIcon} />
          <p className={s.text}>{number}</p>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(deleteContact(id));
        }}
        className={s.delete}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
