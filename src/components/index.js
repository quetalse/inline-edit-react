import React, {useState, Fragment} from 'react';
import Loader from "./loader/loader";
import PropTypes from 'prop-types';
import './index.css';

// const style = {
    // 'display': 'inline-flex',
    // 'outline': 'none',
    // 'overflowX': 'hidden',
    // 'width': 'auto',
    // 'maxWidth': 'calc(100% - 22px)',
    // "borderRadius": "4px",
    // "whiteSpace": "nowrap"
// }

const InputMode = ({title, setTitle, dropTitle, updateHandler}) => {

    const changeHandler = (e) => {
        setTitle(e.target.value)
    };

    const keyDownHandler = (event) => {
        if(event.key === 'Enter'){
            updateHandler(title);
        }
        if (event.key === 'Escape'){
            dropTitle();
        }
    }

    return (
        <input
            className="input-mode"
            type="text"
            value={title}
            // style={{...style}}
            onChange={changeHandler}
            onBlur={dropTitle}
            autoFocus={true}
            onKeyDown={keyDownHandler}
        />
    )
}

const TextMode = ({enableEditable, title, loading}) => {

    const loader = loading && <Loader/>
    const setBackground = (e) => {
        e.target.style.background = '#e6e4e4';
        e.target.style.color = '#212121';
        e.target.style.borderRadius = '8px';
        e.target.style.padding = '0 6px';
    }
    const clearBackground = (e) => {
        e.target.style.background = 'none';
        e.target.style.color = 'inherit';
    }

    return (
        <Fragment>
            <span
                className="text-mode"
                onMouseOver={setBackground}
                onMouseLeave={clearBackground}
                onClick={enableEditable}
            >
                {title}
            </span>
            {loader}
        </Fragment>
    )
}

const InlineEdit = ({initTitle, onEdit, onSuccess, onFail, align}) => {

    const [isEditable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(initTitle);
    const titleAlign = () => {
        switch(align){
            case "center":
                return "ier-center"
            case "left":
                return "ier-left"
            case "right":
                return "ier-right"
            default:
                return "ier-center"
        }
    }

    const enableEditable = () => {
        setEditable(true);
    };
    const disableEditable = () => {
        setEditable(false);
    };

    const dropTitle = () => {
        setTitle(initTitle);
        disableEditable();
    }

    const updateHandler = async (newData) => {
        if(newData.trim() === initTitle){
            dropTitle()
        }else{
            disableEditable();
            setLoading(true);
            try{
                await onEdit(newData);
                onSuccess();
                setLoading(false);
            }
            catch (err) {
                onFail(err);
                dropTitle();
                setLoading(false);
            }
        }
    };

    const mode = isEditable ?
        <InputMode
            title={title}
            setTitle={setTitle}
            dropTitle={dropTitle}
            updateHandler={updateHandler}
        /> :
        <TextMode
            enableEditable={enableEditable}
            title={title}
            loading={loading}
        />

    return (
        <div className={`wrapper ${titleAlign()}`}>
            {mode}
        </div>
    );
}


InlineEdit.propTypes = {
    initTitle: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    align: PropTypes.oneOf(['center', 'left', 'right'])
}

InlineEdit.defaultProps = {
    onSuccess: () => {return true},
    onFail: () => {return true}
}



export default InlineEdit;
