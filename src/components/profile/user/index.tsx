/* eslint-disable @next/next/no-img-element */
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/profile.module.scss";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import profileService from "@/services/profileService";
import ToastComponent from "@/components/common/toast";
import { error } from "console";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter()
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(email)
  const [created_at, setCreated_at] = useState("");
  const date = new Date(created_at)
  const month = date.toLocaleDateString("default", { month: "long" })

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email)
      setCreated_at(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await profileService.userUpdated({
      firstName,
      lastName,
      phone,
      email,
      created_at,
    });
    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Informações Alteradas com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      if(email != initialEmail) {
        sessionStorage.clear()
        router.push('/')
      }
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse e-mail");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
    }
  };

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p
            className={styles.nameAbbreviation}
          >{`${firstName[0]}${lastName[0]}`}</p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br /> {`${date.getDay()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>

        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeHolder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(event: { target: { value: SetStateAction<string>; }; }) => setFirstName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeHolder="Qual o seu sobrenome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(event: { target: { value: SetStateAction<string>; }; }) => setLastName(event.target.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeHolder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPhone(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeHolder="Coloque o seu e-mail"
              required
              className={styles.input}
              value={email}
              onChange={(event: { target: { value: SetStateAction<string>; }; }) => setEmail(event.target.value)}
            />
          </FormGroup>

          <Button className={styles.formBtn} outline type="submit">
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
