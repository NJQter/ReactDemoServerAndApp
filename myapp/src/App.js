import React, {Component} from 'react';
import request from 'axios'
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabList: null,
            selectedIndex: 0
        }
    }

    componentDidMount() {
        let _url = 'http://172.31.38.78:3001/tabList'
        let that = this

        request.get(_url, {}).then((response)=>{
            that.setState({
                tabList: response.data && response.data.tabList
            })
        }).catch((err)=> {
            alert(err)
        })
    }

    autoScroll(index) {
        if (this.refs.tabBar && this.refs.tabBar.scrollTo) {
           this.refs.tabBar.scroll(index * 100,0)
        }
    }

    render() {
        let that = this;
        return (
            <div style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'#f9f9f9'}}>
                <div ref="tabBar" style={{display:'flex',height:44,backgroundColor:'#e5e5e5',whiteSpace:'nowrap',overflowX:'scroll'}}>
                            {
                                that.state.tabList && that.state.tabList.map((tab, index) => {
                                    let isSelected = index === that.state.selectedIndex
                                    let selectedStyle = isSelected ? styles.tabItemSelected : styles.tabItem
                                    return (
                                        <div key={index} style={selectedStyle} onClick={()=>{
                                            if (that.state.selectedIndex !== index) {
                                                that.setState({selectedIndex:index})
                                            }
                                        }}>
                                            <div style={{paddingLeft:14,paddingRight:14}}>
                                                <Link>{tab.name}</Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                </div>
            </div>
        )
    }
}

const styles = {
    tabItem: {
        display:'flex',
        alignItems:'center'
    },
    tabItemSelected: {
        display:'flex',
        alignItems:'center',
        color:'#0c7f12'
    }
}

export default App;
