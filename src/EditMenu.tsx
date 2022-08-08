import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { IoCopyOutline, IoTrashOutline } from "react-icons/io5";
import { object, string } from "yup";
import { AddAdmittedEmail } from "./AddAdmittedEmail";
import { Button } from "./Button";
import { Input } from "./Input";
import { list } from "./types/list";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  updateDoc,
  doc,
  serverTimestamp,
  FieldValue,
  Timestamp,
} from "firebase/firestore";
import { myFirestore } from "./firebase";

export const EditMenu = ({
  list,
  onClose,
}: {
  list: list;
  onClose: () => void;
}) => {
  return (
    <Formik
      initialValues={{
        title: list.title,
        public: list.public,
        admitted: list.admitted,
      }}
      onSubmit={(values) => {
        const newData: {
          title?: string;
          public?: boolean;
          admitted?: string[];
          updatedAt: FieldValue;
        } = { updatedAt: serverTimestamp() };
        if (list.title !== values.title) newData.title = values.title;
        if (values.public === true) {
          if (JSON.stringify(list.admitted) !== JSON.stringify(values.admitted))
            newData.admitted = values.admitted;
          if (list.public !== values.public) newData.public = values.public;
        } else if (values.public !== list.public)
          newData.public = values.public;
        updateDoc(doc(myFirestore, "lists", list.id), newData);
        onClose();
      }}
      validationSchema={object({
        title: string().min(1, "Can't be empty"),
      })}
    >
      {({ values, setValues }) => (
        <div className="absolute bg-black/50 top-0 left-0 h-full w-full flex flex-col justify-center items-center">
          <Form className="flex flex-col gap-2 bg-white p-2 xs:rounded-md">
            <h2 className="font-bold text-xl">Edit list</h2>
            <div className="grid grid-cols-[auto_auto] gap-1 items-center ">
              <label className="justify-self-end" htmlFor="edit-title">
                Title
              </label>
              <Field name="title">
                {({ field }: { field: FieldProps }) => (
                  <Input id="edit-title" type="text" {...field} />
                )}
              </Field>
              <ErrorMessage name="title">
                {(msg) => <div className="font-bold text-red-800">{msg}</div>}
              </ErrorMessage>
              <div className="col-span-2">
                <Field id="public-check" name="public" type="checkbox"></Field>
                <label className="ml-1" htmlFor="public-check">
                  Make public
                </label>
              </div>
              {values.public && (
                <>
                  <ul className="list-decimal pl-4 col-span-2">
                    <li>Share list ID with other persons</li>
                    <li>Add them to your list editors</li>
                  </ul>
                  <label className="justify-self-end" htmlFor="project-id">
                    Project ID
                  </label>
                  <div className="flex gap-1">
                    <input
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      type="text"
                      id="project-id"
                      value={list.id}
                      readOnly
                    />
                    <CopyToClipboard text={list.id}>
                      <button
                        type="button"
                        onClick={(e) => {
                          (
                            e.currentTarget.lastChild as HTMLElement
                          ).textContent = "Copied!";
                        }}
                        className="flex gap-1 items-center border-2 rounded px-1 py-0.5"
                      >
                        <IoCopyOutline />
                        <span>Copy ID</span>
                      </button>
                    </CopyToClipboard>
                  </div>

                  <AddAdmittedEmail
                    admitted={values.admitted}
                    onAdd={(admittedEmail) =>
                      setValues({
                        ...values,
                        admitted: [...values.admitted, admittedEmail],
                      })
                    }
                  />
                  {values.admitted.map((admittedEmail) => (
                    <div
                      className="col-span-2 rounded border-2 py-0.5 px-1 justify-between flex"
                      key={admittedEmail}
                    >
                      {admittedEmail}
                      <button
                        onClick={() => {
                          const newEditors = values.admitted.filter(
                            (item) => item !== admittedEmail
                          );
                          setValues({ ...values, admitted: newEditors });
                        }}
                        className="text-gray-700 hover:text-black text-2xl"
                      >
                        <IoTrashOutline title="Delete" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex gap-1">
              <Button type="submit">Save</Button>
              <Button onClick={onClose} type="button">
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
