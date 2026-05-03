import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';

const chatData: Chat[] = [
  {
    avatar: UserOne,
    name: 'Devid Heilo',
    text: 'How are you?',
    time: 12,
    textCount: 3,
    color: '#10B981',
  },
  {
    avatar: UserTwo,
    name: 'Henry Fisher',
    text: 'Waiting for you!',
    time: 12,
    textCount: 0,
    color: '#DC3545',
  },
  {
    avatar: UserFour,
    name: 'Jhon Doe',
    text: "What's up?",
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserFive,
    name: 'Jane Doe',
    text: 'Great',
    time: 32,
    textCount: 2214,
    color: '#FFBA00',
  },
  {
    avatar: UserOne,
    name: 'Jhon Doe',
    text: 'How are you?',
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserThree,
    name: 'Jhon Doe',
    text: 'How are you?',
    time: 32,
    textCount: 3,
    color: '#FFBA00',
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-sm border max-h-[50vw] overflow-y-auto border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
     <div className='flex justify-around mb-5'>
      <h4 className="flex items-center p-0 px-7.5 text-xl font-semibold text-black dark:text-white">
      player
         
      </h4>
      <input
            type="text"
            placeholder='search'
            className="w-2/4 min-w-[200px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          </div>
      <div>
        {chatData.map((chat, key) => (
          <Link
            to="/"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={chat.avatar} alt="User" />
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{backgroundColor: chat.color}}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
              
              </div>
              {chat.textCount !== 0 && (
                <>
                <div className="flex h-6 w-auto p-2 items-center justify-center rounded-full bg-red">
                  <span className="text-sm font-medium text-white">
                    {' '}
                    {chat.textCount}
                  </span>
                  
                </div>
                <div className="flex h-6 w-auto p-2 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {' '}
                    {chat.textCount}
                  </span>
                  
                </div>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
