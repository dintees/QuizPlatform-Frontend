import React from 'react'
import "../../assets/css/Modal.scss"

interface Props {
    children: React.ReactNode,
    open: boolean,
    title: string,
    buttons?: JSX.Element,
    onClose: () => void
}

function Modal(props: Props) {
    return (
        <>
            {props.open &&
                <div className='modal-overlay'>
                    <div className="modal-container">
                        <div className="modal-title">
                            <div className="modal-title-content">{props.title}</div>
                            <div className="modal-title-close" onClick={props.onClose}>&times;</div>
                        </div>
                        <div className="modal-content">
                            {props.children}
                        </div>
                        <div className="modal-buttons">
                            {props.buttons}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal
