import React from "react";
import * as yup from "yup";
import { format } from "date-fns";
import MainLayout from "../../components/main-layout";
import Styled, { TaskItem } from "./style";
import axios from "../../utils/http";
import { IData, IModals } from "./types";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../components/toast";
import Modals from "../../components/modal";
import { Form } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import ButtonSubmit from "../../components/ui/button";
import { SelectInput } from "../../components/ui/select";
import { uuid } from "../../utils/uid";
import { Delete } from "@mui/icons-material";

const initialVal = { task_name: "", status: 99, task_desc: "" };

const Homepage: React.FC = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const dataRedux = useSelector((state: { data: IData[] }) => state);

  const [Toast, setToast] = useToast();
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState<IModals>({
    visible: false,
    edit: false,
    id: "",
  });
  const [initial, setInitial] = React.useState(initialVal);
  // const [data, setData] = React.useState<IData[]>()
  const apiAction =
    dataRedux.data.length === 1 &&
    dataRedux.data[0].id === 99 &&
    dataRedux.data[0].status === 998;

  const schema = yup.object().shape({
    task_name: yup.string().required("This field is required!"),
    task_desc: yup.string().required("This field is required!"),
    status: yup.string().required("This field is required!"),
  });

  React.useEffect(() => {
    const getAPI = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<IData[]>("/to-do-list");

        dispatch({ type: "INITIAL_API", value: data });
        // setShoes(data);
      } catch (error) {
        setToast({ message: "Error get API" });
      } finally {
        setTimeout(() => setLoading(false), 400);
        // setLoading(false);
      }
    };
    // console.log(dataRedux.data.length);
    if (apiAction) {
      getAPI();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: Record<string, string>) => {
    // console.log("yes");

    if (!modal.edit) {
      const dataSubmit = {
        id: uuid(),
        title: values.task_name,
        description: values.task_desc,
        status: parseInt(values.status),
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm"),
      };
      // console.log(dataSubmit);
      dispatch({ type: "CREATE_TASK", value: dataSubmit });
    } else {
      let objIndex = dataRedux.data?.findIndex((obj) => obj.id === modal.id);
      const dataSubmit = {
        id: modal.id,
        title: values.task_name,
        description: values.task_desc,
        status: parseInt(values.status),
        createdAt: dataRedux.data[objIndex]?.createdAt,
      };
      // console.log(dataSubmit);
      dispatch({ type: "EDIT_TASK", value: dataSubmit });
    }
    setModal({ ...modal, visible: false });
  };

  const handleModal = (id: string | number, type: string) => {
    setModal({ visible: true, edit: type === "edit", id });
    let selectedData = dataRedux.data?.filter((val) => val.id === id);

    // console.log(selectedData);

    if (selectedData.length > 0) {
      setInitial({
        task_name: selectedData[0].title,
        status: selectedData[0].status,
        task_desc: selectedData[0].description,
      });
    } else {
      setInitial(initialVal);
    }
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", value: { id: modal.id } });
    setModal({ ...modal, visible: false });
  };

  return (
    <MainLayout>
      <Toast />

      <Modals
        visible={modal.visible}
        onDismiss={() => setModal({ ...modal, visible: false })}
      >
        <Styled.ModalWrapper>
          <Form
            onSubmit={onSubmit}
            initialValues={modal.edit ? initial : {}}
            // schema={edit.edit ? schema : null}
            schema={schema}
          >
            <Input
              disabled={loading}
              label="Task Name"
              name={`task_name`}
              width="70%"
              type="text"
              // disabled={sdm}
            />

            <SelectInput
              disabled={loading}
              label="Status"
              name={`status`}
              width="70%"
              options={[
                { label: "TO DO", value: 0 },
                { label: "DONE", value: 1 },
              ]}
            />

            <Input
              disabled={loading}
              label="Task Description"
              name={`task_desc`}
              width="70%"
              type="text"
              // disabled={sdm}
            />

            <Styled.ButtonWrapper>
              <ButtonSubmit disabled={loading} width="50%">
                Submit
              </ButtonSubmit>
              {initial.status !== 1 && modal.edit ? (
                <ButtonSubmit
                  disabled={loading}
                  type="button"
                  width="30%"
                  bgColor="red"
                  onClick={handleDelete}
                >
                  <Delete /> Delete Task
                </ButtonSubmit>
              ) : null}
            </Styled.ButtonWrapper>
          </Form>
        </Styled.ModalWrapper>
      </Modals>

      <Styled.Wrapper>
        <Styled.ChildWrapper>
          <p className="headText">Task List</p>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <ButtonSubmit
              type="button"
              onClick={() => handleModal("", "create")}
            >
              + Add Task
            </ButtonSubmit>
          </div>

          {dataRedux.data
            ?.filter((val) => val.status !== 1)
            .map((val, i) => (
              <TaskItem
                key={i}
                title={val.title}
                done={val.status === 1}
                time={val.createdAt}
                onClick={() => handleModal(val.id, "edit")}
              />
            ))}
        </Styled.ChildWrapper>
        <Styled.ChildWrapper>
          <p className="headText">Task Done List</p>

          {dataRedux.data
            ?.filter((val) => val.status === 1)
            .map((val, i) => (
              <TaskItem
                key={i}
                title={val.title}
                done
                time={val.createdAt}
                onClick={() => handleModal(val.id, "edit")}
              />
            ))}
        </Styled.ChildWrapper>
      </Styled.Wrapper>
    </MainLayout>
  );
};

export default Homepage;
