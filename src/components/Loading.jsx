import React from "react";
import styles from "../style/loading.css";

/**
@param page 当前页
@param callback 获取数据回调函数
@param pd 是否没有数据了
*/
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pd: this.props.pd,
      display: true
    };
  }
  //获取滚动条距底部高度
  getbottom=()=>{
    let scroll =document.documentElement.scrollTop ||window.pageYOffset ||document.body.scrollTop;
    let move =document.body.scrollHeight -scroll -document.documentElement.clientHeight;
    return move
  }
  //定义滚轮事件，控制loading是否显示
  scrollthing = () => {
    let move =this.getbottom()
         
    if (move == 0) {
      if (this.props.page) {
        let a = this.props.page + 1;
        this.props.callback(a);
      }
    } else if (move <= 100&&this.state.display==false) {
      this.setState({
        display: true
      });
    } else if(this.state.display==true&&move>100) {
      this.setState({
        display: false
      });
    }
  };
  render() {
    if (this.state.display) {
      if (this.props.pd){
        return (
          <div className={styles.loading}>
            <div className={styles.nodata}>没有更多了</div>
          </div>
        );
      } else {
        return (
          <div className={styles.loading}>
            <img className={styles.loading} src={require("../assets/1.gif")} />
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
  componentDidMount(){
      //初始若无滚动条事件
      let move=this.getbottom()
    if (this.props.pd !== undefined) {
      if (move < 0||move>100) {
        this.setState({
          display: false
        });
      }
    }
    window.addEventListener("scroll", this.scrollthing);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollthing);
  }
}

export default Loading;
