import React from "react";
import "./style.scss";
import "./index.scss";
import { Link } from "react-router-dom";
import NavUser from "./layout/NavUser";
function UserVi() {
  return (
    <NavUser>
      <div className="main ps-0 pt-3 pb-3 pe-0">
        <div className="main-waper ">
          <div className="main-waper-top pt-2 pb-2 ps-4">
            <i className="fa fa-exclamation-triangle"></i>
            <p>
              Bạn vui lòng cập nhật thông tin tài khoản:{" "}
              <Link to="">Cập nhật thông tin ngay</Link>
            </p>
          </div>
          <div className="main-waper-end pt-4 pb-5 ps-4  pe-4">
            <h1 className="info-acc-hd p-3">Ví của tôi</h1>
            <div className="row">
              <div className="p-3">
                <button className="p-2">Voucher của tôi</button>
                <button className="p-2">Voucher đối tác</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavUser>
  );
}

export default UserVi;
