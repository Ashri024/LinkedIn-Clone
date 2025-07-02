export const ProfileFooter = () => {
    return (
      <div className="text-muted-foreground text-sm mt-8 px-4  hidden md:block">
        <div className=" md:grid grid-cols-3  gap-8">
            <div className="space-y-2">
            <p className="font-semibold">About</p>
            <p>Accessibility</p>
            <p>Professional Community Policies</p>
            <p>Privacy & Terms</p>
            <p>Sales Solutions</p>
            </div>
            <div className="space-y-2">
            <p className="font-semibold">Talent Solutions</p>
            <p>Marketing Solutions</p>
            <p>Advertising</p>
            <p>Small Business</p>
            </div>
            <div className="space-y-2">
            <p className="font-semibold">Help</p>
            <p>Visit our Help Center</p>
            <p>Manage your account and privacy</p>
            <p>Recommendation transparency</p>
            </div>
        </div>
        <div className=" mt-6 pb-4">
        LinkedIn Corporation © 2025
        </div>  
      </div>

    );
  };
  