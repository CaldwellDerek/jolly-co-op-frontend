import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import API from '../../../utils/API';


function CancleButton(props) {
  const [msg, setMsg]=useState("Leave this group")
  const [variant, setVariant] =useState("light")
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Leaving the group would lose all game data.
    </Tooltip>
  );
    const leaveGroup = ()=>{
      API.leaveGroup(props.id,props.token).then((data)=>{
        console.log(data)
        setMsg("You have leave this group")
        setVariant("danger")
      })
    }

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button onClick={()=>leaveGroup()} variant={variant}>{msg}</Button>
    </OverlayTrigger>
  );
}

export default CancleButton;