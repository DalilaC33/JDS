const PriorityLabel = ({title, bg_color}) => {
    return (
        <div title={title} className={`priority_label m-1 ${bg_color}`} >    
            <style jsx>{`
                .priority_label {
                    width: 35px;
                    height: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .bg_red {
                    background: #FF0000;
                }
                .bg_yellow {
                    background: #FAFF00;
                }
                .bg_green {
                    background: #52FF00;
                }
                .border_red {
                    border: 2px solid #FF0000;
                }
                .border_yellow {
                    border: 2px solid #FAFF00;
                }
                .border_green {
                    border: 2px solid #52FF00;
                }
            `}</style>
        </div> 
    )
}

export default PriorityLabel