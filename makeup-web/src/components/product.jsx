import React, { Component } from "react";
import Card from "./js/card";
import CreateCard from "./js/createCard"; //創建商品卡
import Ajax from "./js/ajax";
import IMGPath from "./js/imgPath"; //引入圖片
import "./css/product.css";
import { Link } from "react-router-dom";

class Product extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			allData: null,
		};

		this.imgPath = new IMGPath();
		this.ajax = new Ajax();
		this.createCard = new CreateCard();

		this.b = require.context("./images/banner", false, /\.(png|jpe?g|svg)$/);
		this.bg = require.context("./images/background", false, /\.(png|jpe?g|svg)$/);

		if (sessionStorage.getItem("member")) {
			this.ajax.startListener(
				"get",
				`/addLove?cId=${JSON.parse(sessionStorage.getItem("member").cId)}`,
				this.u
			);
		} else {
			this.ajax.startListener("get", "/p", this.u);
		}
	}

	u = data => {
		let newData = [],
			i = 0;

		do {
			let d = [];
			for (let j = 0; j < 8; j++) {
				if (data.p[j + i]) {
					data.p[j + i].addLove = this.addLove;
					d.push(data.p[j + i]);
				} else {
					break;
				}
			}
			newData.push(d);
			i += 8;
		} while (i < data.p.length);

		this.setState({ data: newData[this.props.match.params.page - 1], allData: newData });

		document.querySelector(
			`.page a:nth-of-type(${this.props.match.params.page * 1 + 1})`
		).className = "click";

		//console.log(data.p);
	};

	//加入最愛
	addLove = (event, pid) => {
		event.preventDefault();
		//event.target.innerText = "♥";
		if (sessionStorage.getItem("member")) {
			this.ajax.startListener(
				"get",
				`/addLove?pid=${pid}&cId=${JSON.parse(sessionStorage.getItem("member").cId)}`,
				this.u
			);
		}
		console.log(pid);
	};

	//換頁
	changePage = (page, which) => {
		console.log(page, which);
		if (page < 0 || page > this.state.allData.length - 1) return;
		this.setState({ data: this.state.allData[page] });

		for (let i = 0; i <= this.state.allData.length; i++) {
			let allA = document.querySelectorAll(".page a");
			allA[i].className = null;
		}
		document.getElementById(which).className = "click";
	};

	//頁碼生成
	createPageNumber = () => {
		let pageNumber = this.state.allData.map((item, index) => {
			return (
				<Link
					to={"/p/" + (index + 1)}
					key={index}
					id={"page_" + index}
					onClick={() => {
						this.changePage(index, "page_" + index);
					}}
				>
					{index + 1}
				</Link>
			);
		});

		return pageNumber;
	};

	render() {
		return (
			<main className="productMain">
				<div className="productBanner">
					<img src={this.imgPath.importAll(this.b)["productBanner1.jpg"]} alt="banner" />
				</div>

				<div className="w productPage">
					<img src={this.imgPath.importAll(this.bg)["productBG1.png"]} alt="bg" />

					<div className="hotItems">
						<div className="title">
							<span></span>
							<h3>暢銷商品</h3>
							<span></span>
						</div>

						<div className="grid" style={{ "--i": 4 }}>
							{this.state.data != null
								? this.createCard.create(4, Card, this.state.allData[0])
								: null}
						</div>
					</div>

					<nav className="kindNav">
						<ul>
							<li className="click">眼線</li>
							<li>眼影</li>
							<li>眼眉</li>
							<li>睫毛</li>
						</ul>
					</nav>

					<div className="grid" style={{ "--i": 4 }}>
						{this.state.data != null
							? this.createCard.create(this.state.data.length, Card, this.state.data)
							: null}
					</div>

					<div className="page">
						<Link
							to={
								"/p/" +
								(this.props.match.params.page > 1 ? this.props.match.params.page * 1 - 1 : 1)
							}
							onClick={() => {
								this.changePage(
									this.props.match.params.page * 1 - 2,
									"page_" + (this.props.match.params.page * 1 - 2)
								);
							}}
						>
							&lt;
						</Link>
						{this.state.allData != null ? this.createPageNumber() : null}
						<Link
							to={
								"/p/" +
								(this.props.match.params.page <
								(this.state.allData != null ? this.state.allData.length : null)
									? this.props.match.params.page * 1 + 1
									: this.state.allData != null
									? this.state.allData.length
									: null)
							}
							onClick={() => {
								this.changePage(
									this.props.match.params.page,
									"page_" + this.props.match.params.page
								);
							}}
						>
							&gt;
						</Link>
					</div>
				</div>
			</main>
		);
	}
}

export default Product;
