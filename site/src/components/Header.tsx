import logo from '@/assets/wxad-design.svg';

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 mb-10 z-50 bg-white border-b border-solid border-neutral-200 bg-opacity-95 backdrop-blur-sm">
      <div className="px-12 h-16 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center font-semibold">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"
            />
          </svg>
          曲率连续圆角组件
        </div>
        <a href="https://wxad.design">
          <img className="block w-24" src={logo} alt="wxad.design" />
        </a>
      </div>
    </div>
  );
};

export default Header;
