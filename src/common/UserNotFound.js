import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserNotFound = ({ name }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-1 mt-4">{name} Not Found</h2>
          <p className="mb-4 mx-2">
            Oops! 😖 The {name?.toLowerCase()} was not found.
          </p>
          <div onClick={goBack} className="btn btn-primary mb-4">
            Go back
          </div>
          <div className="mt-4">
            <Image
              src={require("../assets/img/illustrations/page-misc-error.png")}
              alt="page-misc-error"
              width={225}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid misc-bg-wrapper">
        <Image
          src={require("../assets/img/illustrations/bg-shape-image-light.png")}
          alt="page-misc-error"
        />
      </div>
    </div>
  );
};

export default UserNotFound;
