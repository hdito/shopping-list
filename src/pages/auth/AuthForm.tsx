import { useState } from "react";
import { ErrorMsg } from "./ErrorMsg";
import { Message } from "./Message";
import { SignInTab } from "./SignInTab";
import { SignUpTab } from "./SignUpTab";

export const AuthForm = () => {
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  return (
    <div className="py-2 w-full">
      <h1 className="font-bold text-center mb-2">
        To continue please authentificate
      </h1>
      <div className="sm:shadow-sm sm:rounded border-y-2 sm:border-2 sm:max-w-[40ch] w-full m-auto">
        <div className="flex">
          <button
            onClick={() => {
              setIsSignIn(true);
            }}
            className={`${
              !isSignIn &&
              "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setIsSignIn(false);
            }}
            className={`${
              isSignIn &&
              "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-2">
          {isShowMessage && (
            <Message
              message="Check your inbox to verify email"
              onClose={() => setIsShowMessage(false)}
            />
          )}
          {error && <ErrorMsg error={error} onClose={() => setError(null)} />}
          {isSignIn ? (
            <SignInTab onError={setError} />
          ) : (
            <SignUpTab onMessage={setIsShowMessage} onError={setError} />
          )}
        </div>
      </div>
    </div>
  );
};
