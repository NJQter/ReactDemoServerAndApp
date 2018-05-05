import React, {Component} from 'react';
import TabBar from './TabBar';
import axios from 'axios';

const _baseUrl = 'https://172.31.38.78:3002/'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabList: null,
            itemList: null,
            isError: false
        }
    }

    componentDidMount() {
        let _url = _baseUrl + 'tabList'
        let that = this
        axios.get(_url,{
        }).then((resp) => {
            that.setState({
                isError: false,
                tabList:resp.data && resp.data.tabList
            })
        }).catch((err) => {
            that.setState({
                isError:true
            })
        })
    }

    topTabBarView() {
        let that = this
        return (
            <div>
            {
                this.state.tabList &&
                <TabBar tabList={this.state.tabList} onTabItemClicked={(index)=>{
                    let tab = that.state.tabList[index]
                    let _url = _baseUrl + 'itemList'
                    axios.get(_url,{params:{tabId:tab.tabId}}).then((resp) => {
                        that.setState({
                            itemList:resp.data && resp.data.itemList
                        })
                    })
                }}/>
            }
            </div>
        )
    }

    itemsListView() {
        return (
            <div style={{display:'flex',flexDirection:'column'}}>
                {
                    this.state.itemList && this.state.itemList.map((item, index) => {
                        return (
                            <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:9}}>
                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{color:'grey'}}>{index+1}，</div>
                                    <a href="itms-services:///?action=download-manifest&url=https://172.31.38.78:3001/ipa/test.plist">{item.name}</a>
                                </div>
                                <div style={{color:'grey'}}>{item.timestamp}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'#f9f9f9'}}>
                {!this.state.isError && this.topTabBarView()}
                {!this.state.isError && this.state.itemList && this.itemsListView()}

                <a href='itms-services:///?action=download-manifest&url=https://raw.githubusercontent.com/NJQter/NJQter.github.io/master/test.plist'>ipa</a>

            </div>
        )
    }
}
export default App;
