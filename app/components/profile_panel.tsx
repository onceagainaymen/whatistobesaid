// components/ProfilePanel.tsx

type ProfilePanelProps = {
  username: string;
  bio?: string;
  joinDate?: string;
  postCount?: number;
  avatar?: string;
};

export default function ProfilePanel({
  username,
  bio,
  joinDate,
  postCount,
  avatar,
}: ProfilePanelProps) {
  return (
    <div className="relative p-6" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
      <div className="relative border-2 border-black bg-white" style={{ boxShadow: "6px 6px 0px #000" }}>

        {/* Avatar */}
        <div className="border-b-2 border-black">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-48 object-cover block" />
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
              <span
                className="text-6xl font-black uppercase"
                style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
              >
                {username.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">

          {/* Username */}
          <p className="text-xl tracking-widest text-black/50 mb-4">@{username}</p>

          <div className="w-full h-[2px] bg-black mb-4" />

          {/* Bio */}
          {bio && <p className="text-xs leading-relaxed text-black/75 mb-4">{bio}</p>}

          {/* Join date */}
          {joinDate && (
            <p className="text-xs text-black/60 mb-4">
              <span className="font-black text-black">SINCE </span>{joinDate}
            </p>
          )}

          <div className="w-full h-[2px] bg-black mb-4" />

          {/* Post count */}
          {postCount !== undefined && (
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-black"
                style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
              >
                {postCount}
              </span>
              <span className="text-xs tracking-widest uppercase text-black/50">Posts</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
