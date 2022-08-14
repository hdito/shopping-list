import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import short from "short-uuid";
import { object, string } from "yup";
import { myFirestore } from "../../../firebase";
import { list } from "../../../types/list";

export const AddItemForm = ({ list }: { list: list }) => {
  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={object({ title: string().required("Required") })}
      onSubmit={async ({ title }, actions) => {
        const id = short.generate();
        await setDoc(doc(myFirestore, "lists", list.id, "items", id), {
          id,
          title,
          isFinished: false,
          isUrgent: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        actions.resetForm();
      }}
    >
      <div className="px-2 w-full">
        <Form className="m-auto flex gap-2 max-w-xs w-full items-center rounded border-2 border-slate-300 shadow-md px-2 py-2">
          <label htmlFor="title-input">Title</label>
          <Field
            id="title-input"
            className="flex-1 min-w-[3rem] border-y-2 border-t-transparent border-b-slate-300  hover:border-b-slate-500 focus-visible:outline-none bg-transparent focus:border-b-blue-500 focus-visible:border-b-blue-500"
            name="title"
          />
          <ErrorMessage name="title">
            {(msg) => <span className="font-bold text-red-800">{msg}</span>}
          </ErrorMessage>
          <button
            className="rounded bg-slate-700 text-white px-2 py-0.5"
            type="submit"
          >
            Add
          </button>
        </Form>
      </div>
    </Formik>
  );
};
