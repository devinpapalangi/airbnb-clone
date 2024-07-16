"use client";

import React, { useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface LoginFormFields {
  email: string;
  password: string;
}

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues: LoginFormFields = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (
    data: LoginFormFields
  ) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      }

      if (result?.ok && !result?.error) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalSwitch = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div
      className="
        flex
        flex-col
        gap-4"
    >
      <Heading title={"Welcome Back!"} subtitle={"Login to your account"} />
      <Input<LoginFormFields>
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        formatPrice={false}
        required
        register={register}
        errors={errors}
      />
      <Input<LoginFormFields>
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        formatPrice={false}
        required
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div
      className="
        flex
        flex-col
        gap-4
        mt-3"
    >
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
            text-neutral-500
            text-center
            mt-4
            font-light"
      >
        <div
          className="
                flex
                flex-row
                items-center
                justify-center
                gap-2"
        >
          <div>First time using Airbnb?</div>
          <div
            onClick={handleModalSwitch}
            className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                    "
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
