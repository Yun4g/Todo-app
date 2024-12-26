import PropTypes from 'prop-types';
import './completedTask.css';

function CompletedTaskSection({ transferTask }) {
    return (
        <div>
            <div className='heading'>
                <h3>Your Completed Tasks</h3>
            </div>

            <ol>
                {
                    transferTask.map((task, index) => (
                        <li key={index}>
                            {task.text} 
                        </li>
                    ))
                } 
            </ol>
        </div>
    );
}


CompletedTaskSection.propTypes = {
    transferTask: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default CompletedTaskSection;
