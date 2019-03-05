import React from "react";
import styles from "./IndexPage.css";
import Loading from "../components/Loading";
import { connect } from "dva";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page:this.props.newdata.page,
      pd:false
    }
  }
  //判断还有无数据
  changepd=(val)=>{
    this.setState({
      pd:val
    })
  }
  //加载更多数据
  loaddata=(page)=>{
    setTimeout(()=>{
      this.props.dispatch({
        type:'newdata/getmoredata',
        page:page,
        callback:this.changepd
      })
    },1000)
  }
  render() {
    const { curredata} = this.props.newdata;
    if (curredata != false) {
      return (
        <div className={styles.box}>
          {curredata.map((item,index) =>{
            return (
              <div className={styles.main} key={index}>
                <p>姓名：{item.name}</p> <p>年龄：{item.age}</p>{" "}
              </div>
            );
          })}
          <Loading page={this.props.newdata.page} callback={this.loaddata} pd={this.state.pd}/>
        </div>
      );
    } else if (curredata.length == 0){
      return <div className={styles.box}>暂无数据</div>;
    } else {
      return <div className={styles.box}><Loading /></div>;
    }
  }
}

export default connect(({ newdata }) => ({ newdata }))(IndexPage);
