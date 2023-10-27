import PropTypes from "prop-types";

import PopupLogic from "./PopupEffect";

const Popup = ({ content, onClose }) => {
  return (
    <PopupLogic onClose={onClose}>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        role="dialog"
        aria-labelledby="popupTitle"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className="absolute bg-white p-8 w-4/5 h-3/4 max-w-md max-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 overflow-y-auto p-4">
            <h2 id="popupTitle" className="text-xl font-bold mb-4">
              {content.title}
            </h2>
            <p>
              <strong>{content.lastModified}</strong>
            </p>
            <p className="mt-4">{content.intro}</p>
            {content.sections &&
              content.sections.map((section, index) => (
                <div key={section.heading + index} className="mt-4">
                  <h3 className="text-lg font-semibold">{section.heading}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            <button
              className="mt-4 bg-red-500 text-white p-2 rounded-md"
              onClick={onClose}
              aria-label="Close popup"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </PopupLogic>
  );
};
Popup.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
