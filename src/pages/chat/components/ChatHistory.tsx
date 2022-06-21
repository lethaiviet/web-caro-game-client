import Scrollbars from "react-custom-scrollbars-2";

function OtherMessageHistory() {
  return (
    <div className="message-data">
      <span className="message-data-name pR-10">Black Cat</span>
      <span className="message-data-time">10:10 PM, Today</span>
      <div className="message other-message">
        The flex property sets the flexible length on flexible items. Note: If
        the element is not a flexible item, the flex property has no effect.
      </div>
    </div>
  );
}

function MyMessageHistory() {
  return (
    <div className="message-data float-end text-end">
      <span className="message-data-time pR-10">10:10 PM, Today</span>
      <span className="message-data-name">Yellow Cat</span>
      <div className="message my-message float-end text-end">
        The flex property sets the flexible length on flexible items. Note: If
        the element is not a flexible item, the flex property has no effect.
      </div>
    </div>
  );
}

export default function ChatHistory() {
  return (
    <div className="w-100 border-bottom chat-history">
      <Scrollbars>
        <OtherMessageHistory />
        <OtherMessageHistory />
        <MyMessageHistory />
        <MyMessageHistory />
      </Scrollbars>
    </div>
  );
}
