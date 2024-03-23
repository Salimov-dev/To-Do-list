import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// forms
import TaskForm from "@forms/task/task.form";
// schemas
import { taskSchema } from "@schemas/task.shema";

const initialState = {
  userName: "",
  userEmail: "",
  text: ""
};

const TaskCreate = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onSubmit",
    resolver: yupResolver(taskSchema)
  });

  const data = watch();

  const onSubmit = () => {
    // setIsLoading(true);

    const newData = {
      ...data,
      userName: data.userName.trim(),
      text: data.text.trim()
    };

    // dispatch<any>(createTask(newData))
    //   .then(() => {
    //     onClose();
    //     toast.success("Задача успешно создана!");
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <HeaderWithCloseButton
        title="Создать новую задачу"
        onClose={onClose}
      ></HeaderWithCloseButton>
      <TaskForm data={data} register={register} errors={errors} watch={watch} />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
};

export default TaskCreate;