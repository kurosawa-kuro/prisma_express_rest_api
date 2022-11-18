import React, { useEffect } from "react";
import styles from "./MainPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncGetProfile, selectProfile } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
// import Segment from "./Segment";
// import Brand from "./Brand";
// import Vehicle from "./Vehicle";

const MainPage = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const profile: any = useSelector(selectProfile);

  const Logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      console.log("fetchBootLoader")
      const resFetchAsyncGetProfile = await dispatch(fetchAsyncGetProfile());
      console.log({ resFetchAsyncGetProfile })
    };

    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className={styles.mainPage__root}>
      <div >
        <div>
          {profile.name}
        </div>
        <div>
          <span data-testid="span-title" className={styles.mainPage__title}>
            Vehicle register system
          </span>
        </div>
        <div>
          <button data-testid="btn-logout" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>
      <div >
        <div>
          {/* <Segment /> */}
        </div>
        <div>
          {/* <Brand /> */}
        </div>
        <div>
          {/* <Vehicle /> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
