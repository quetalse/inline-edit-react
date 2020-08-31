import React, {useState, Fragment} from 'react';
import Loader from "./loader";
import PropTypes from 'prop-types';

const style = {
    'display': 'inline-flex',
    'border': 'none',
    'outline': 'none',
    'overflowX': 'hidden',
    'width': 'auto',
    'maxWidth': 'calc(100% - 22px)',
    "borderRadius": "4px",
    "margin": "0 4px 0 0",
    "padding": "0 4px 0 4px",
    "whiteSpace": "nowrap"
}

const InputMode = ({title, setTitle, dropTitle, updateHandler}) => {

    const changeHandler = (e) => {
        setTitle(e.target.value)
    };

    const keyDownHandler = (event) => {
        if(event.key === 'Enter'){
            updateHandler({
                title: title
            });
        }
        if (event.key === 'Escape'){
            dropTitle();
        }
    }

    return (
        <span>
            <input
                type="text"
                value={title}
                style={{...style, 'width': '100%', 'maxWidth': '100%', 'backgroundColor': '#e6e4e4'}}
                onChange={changeHandler}
                onBlur={dropTitle}
                autoFocus={true}
                onKeyDown={keyDownHandler}
            />
        </span>
    )
}

const TextMode = ({enableEditable, title, loading}) => {

    const loader = loading && <Loader/>
    const setBackground = (e) => {
        e.target.style.background = '#e6e4e4';
    }
    const clearBackground = (e) => {
        e.target.style.background = 'none';
    }

    return (
        <Fragment>
            <span
                style={style}
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

const InlineEdit = ({initTitle, onEdit, onSuccess, onFail}) => {

    
    const [isEditable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(initTitle);

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
        if(newData.title.trim() === initTitle){
            dropTitle()
        }else{
            disableEditable();
            setLoading(true);
            try{
                await onEdit(newData);
                onSuccess();
                // enqueueSnackbar("Заголовок обновлен", { variant: "success" });
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
        <Fragment>
            {mode}
        </Fragment>
    );
}


InlineEdit.propTypes = {
    initTitle: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
}

InlineEdit.defaultProps = {
    onSuccess: () => {return true},
    onFail: () => {return true}
}



export default InlineEdit;
