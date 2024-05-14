import { useState } from "react";
// import loader from './assets/loader-unscreen.gif'
import { Body } from "./Body";

export const FeedPostDesign = ({posts,createPostFunction,walletaddress,connect,Loading}) =>{ //mainly UI design functionality goes here👇
    const [postText, setPostText] = useState('')
    const [hastagText, setHastagText] = useState('')
    const [limit, setLimit] = useState(10)

    async function submit(){ //calling post request
      if(postText && hastagText && posts.length)
      {
        await createPostFunction(postText,hastagText,posts.length)
        setHastagText('') //once post request is done, making the user inputs data clear
        setPostText('') //once post request is done, making the user inputs data clear
      }
    }

    function increase(){ //pagination
      setLimit(limit+10)
    }

    return (
      <div
       className="scrollStyle"
      >
        <div
          className="bodyStyle"
        >
          <div className="borderStyle">
            <h3> Home </h3>
         { walletaddress && walletaddress!=='' ? <div>
              <div className="inputStyle">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  rows={1}
                  placeholder="What's happening?..."
                  className="inputStyles"
                />
              </div>

              <div className="secondaryInputBoxStyles">
                <textarea
                  value={hastagText}
                  onChange={(e) => setHastagText(e.target.value)}
                  rows={1}
                  placeholder="#hastag"
                  className="hastagInputStyles"
                />
                <button className="buttonStyle" onClick={submit}>
                  Tweet
                </button>
              </div>
            </div> :  <div className="connectWalletStyle"> 
                
                {/* connect to phantom */}
                {connect()} 
              
              </div>
               }
          </div>
          <div>
            {/* get the data from the get request */}
            { !Loading && posts.length>0 &&   
              posts.slice(0,limit).map((post, index) => (
               <Body index={index} key={index} post={post} />
              ))}
          </div>
        </div>
        { Loading && 
        <div className="center">
          {/* <img  src={loader} />  loader */}
          Loading...
          </div>
        }
        <div className="center">
         { limit < posts.length && <button className="loadbuttonStyle" onClick={increase}> Load more </button>}
        </div>
      </div>
    );
}