import { OverlayTrigger, Tooltip } from 'react-bootstrap';

 const TriggerRendererProp = ( {classItem, text} ) => {
    return (
        <OverlayTrigger
            key={'bottom'}
            placement={'bottom'}
            overlay={
                <Tooltip id={`tooltip-${'bottom'}`}>
                    {text}
                </Tooltip>
            }
        >
            <button
            className="btn-nav"
            >
                <i className={classItem} style={ {fontSize: 20} }></i>
            </button>
        </OverlayTrigger>
  );
}

export default TriggerRendererProp;