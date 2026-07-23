export default function DashboardSettingsView({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-3xl border border-white/5 bg-[#141A29] p-6 text-center">
      {Icon && <Icon className="mx-auto h-12 w-12 text-purple-400" />}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
