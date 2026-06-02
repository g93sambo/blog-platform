const navigationItems = [
    { label: "Dashboard", icon: "⊞", top: "top-[92px]", active: false },
    { label: "My Posts", icon: "✎", top: "top-36", active: false },
    { label: "New Post", icon: "＋", top: "top-[196px]", active: false },
    { label: "Analytics", icon: "◎", top: "top-[248px]", active: false },
    { label: "Saved", icon: "♡", top: "top-[300px]", active: true },
    { label: "Settings", icon: "⚙", top: "top-[352px]", active: false },
  ];
  
  export const NavigationSidebarSection = (): JSX.Element => {
    return (
      <aside
        aria-label="Sidebar navigation"
        className="relative h-[982px] w-60 bg-[#121828]"
      >
        <div className="absolute left-6 top-7 flex items-baseline">
          <span className="[font-family:'Inter-Bold',Helvetica] text-lg font-bold leading-[normal] tracking-[0] text-[#378add]">
            Blog
          </span>
          <span className="[font-family:'Inter-Medium',Helvetica] text-lg font-medium leading-[normal] tracking-[0] text-white">
            ify
          </span>
        </div>
        <nav aria-label="Primary" className="relative h-full w-full">
          <ul className="m-0 list-none p-0">
            {navigationItems.map((item) => (
              <li key={item.label}>
                {item.active && (
                  <div
                    aria-hidden="true"
                    className="absolute left-3 top-72 h-10 w-[216px] rounded-lg bg-[#378add26]"
                  />
                )}
                <button
                  type="button"
                  aria-current={item.active ? "page" : undefined}
                  className="absolute left-0 top-0 h-0 w-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-7 ${item.top} whitespace-nowrap text-[15px] leading-[normal] tracking-[0] ${
                      item.active
                        ? "[font-family:'Inter-Medium',Helvetica] font-medium text-[#378add]"
                        : "[font-family:'Inter-Regular',Helvetica] font-normal text-[#8c94aa]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`absolute left-14 ${item.top} text-sm leading-[normal] tracking-[0] ${
                      item.active
                        ? "[font-family:'Inter-Medium',Helvetica] font-medium text-[#378add]"
                        : "[font-family:'Inter-Regular',Helvetica] font-normal text-[#b4bcd2]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  };
  