import React, { Component } from "react";
import { Link } from "react-router-dom";
import IMGPath from "./js/imgPath";//引入圖片
import Ajax from "./js/ajax"//和伺服連線
import "./css/login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      class1: "yesAccount active",
      class2: "noAccount",
      registerForm: "active",
      loginForm: "",
      changeFormLeft: { left: "0%" },
      inputFormLeft: { left: "50%" },

      data: null
    }

    this.imgPath = new IMGPath();
    this.ajax = new Ajax();

    this.bg = require.context("./images/background", false, /\.(png|jpe?g|svg)$/);
  }

  signChange = (className) => {
    let door = document.querySelector(".doorIMG img");

    switch (className) {
      case "yesAccount":
        this.state.class1 = (this.state.class1 === className) ? className + " active" : className;
        this.state.class2 = "noAccount active";

        this.state.registerForm = "";
        this.state.loginForm = "active";
        //this.state.changeFormLeft = { left: "50%" };
        //this.state.inputFormLeft = { left: "0%" };

        door.src = this.imgPath.importAll(this.bg)["開門.png"];
        this.setState({});
        break;

      case "noAccount":
        this.state.class1 = "yesAccount active";
        this.state.class2 = (this.state.class2 === className) ? className + " active" : className;

        this.state.registerForm = "active";
        this.state.loginForm = "";
        //this.state.changeFormLeft = { left: "0%" };
        //this.state.inputFormLeft = { left: "50%" };

        door.src = this.imgPath.importAll(this.bg)["關門.png"];

        this.setState({});
        break;

      default:
        return;
    }
  }

  //登入
  welcome = (el) => {
    let account = document.querySelector(el + " #account").value;
    let password = document.querySelector(el + " #password").value;
    console.log(account)
    this.ajax.startListener("get", "/login?account=" + account, this.u/*, `account=${account}&password=${password}`*/);
  }

  u = (data) => {
    console.log(data[0])
    if (data[0].info === "yes") {
      window.location.href = "/";
    } else {
      this.setState({ data: "帳號或密碼錯誤" });
    }
    console.log(this.state.data)
  }

  render() {
    return (
      <main className="loginMain" id="container">
        <div className="loginWrap" style={this.state.styleLoginWrap}>
          <div className="changeForm" style={this.state.changeFormLeft}>
            <div className="doorIMG">
              <img src={this.imgPath.importAll(this.bg)["關門.png"]} alt="" />

              <div className={this.state.class1}>
                <h1>歡迎回來</h1>
                <button onClick={() => this.signChange("yesAccount")}>立即登入</button>
              </div>

              <div className={this.state.class2}>
                <h1>沒有帳號</h1>
                <button onClick={() => this.signChange("noAccount")}>立即註冊</button>
              </div>
            </div>
          </div>

          <div className="inputForm" style={this.state.inputFormLeft}>
            <div className={this.state.registerForm}>

              <h1>Register 註冊</h1>
              <div>
                <div className="inputWrap">
                  <label htmlFor="username">姓名</label>
                  <input type="text" name="username" id="username" placeholder="姓名" autoComplete="off" />
                </div>

                <div className="inputWrap">
                  <label htmlFor="account">帳號</label>
                  <input type="text" name="account" id="account" placeholder="帳號" autoComplete="off" />
                </div>

                <div className="inputWrap">
                  <label htmlFor="password">密碼</label>
                  <input type="password" name="password" id="password" placeholder="密碼" autoComplete="off" />
                </div>

                <div className="inputWrap">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" name="email" id="email" placeholder="E-mail" autoComplete="off" />
                </div>
              </div>

              <button>送出</button>
            </div>

            <div id="loginForm" className={this.state.loginForm}>

              <h1>Login 登入</h1>

              <p className="error">{this.state.data != null ? this.state.data : ""}</p>
              {/* <div className="social-container">
                <a href="#" className="social">
                  <i className="fa fa-facebook"></i>
                </a>

                <a href="#" className="social">
                  <i className="fa fa-google"></i>
                </a>

                <a href="#" className="social">
                  <i className="fa fa-twitter"></i>
                </a>
              </div> */}
              <div>
                <div className="inputWrap">
                  <label htmlFor="account">帳號</label>
                  <input type="text" id="account" placeholder="帳號" autoComplete="off" required />
                </div>

                <div className="inputWrap">
                  <label htmlFor="password">密碼</label>
                  <input type="password" id="password" placeholder="密碼" autoComplete="off" />
                </div>
              </div>

              <button onClick={() => { this.welcome("#loginForm") }}>送出</button>
            </div>
          </div>
        </div>


        {/*<div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">

              <h1>歡迎回來!</h1>

              <p>已經是會員了嗎?</p>

              <button className="ghost" id="signIn">登入</button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>歡迎加入</h1>

              <p>加入會員，享會員優惠</p>

              <button className="ghost" id="signUp">註冊</button>
            </div>
          </div>
        </div>*/}
      </main>
    );
  }
}

export default Login;