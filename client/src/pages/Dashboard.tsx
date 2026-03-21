import DashboardCard from "../components/DashboardCards";
import { getCurrentUser } from "@/apolloClient/querys";
import { type UserDetails } from "../assets/Types";
import { Spinner } from "../components/ui/spinner";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();


  const { loading, error, data } = useQuery<{ me: UserDetails }>(getCurrentUser)
  const me = data?.me

  if (error) {
    toast("Something went wrong login Again", { position: "top-left" })
    navigate("/login");
    return null
  }
  if (loading || !me) {
    toast("Loading your data", { position: "top-left" })
    return (
      <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        <Spinner />
        <span className="text-lg tabular-nums">Loading your data</span>
      </div>
    );
  }

  const cards = [
    {
      title: "Personal Info",
      iconPath: "user",
      rows: [
        { label: "First Name", value: me.firstName },
        { label: "Last Name", value: me.lastName },
        { label: "Maiden Name", value: me.maidenName },
        { label: "Age", value: me.age?.toString() },
        { label: "Gender", value: me.gender, capitalize: true },
        { label: "Birth Date", value: me.birthDate },
      ],
    },
    {
      title: "Physical Details",
      iconPath: "heart",
      rows: [
        { label: "Height", value: `${me.height} cm` },
        { label: "Weight", value: `${me.weight} kg` },
        { label: "Eye Color", value: me.eyeColor },
        { label: "Hair Color", value: me.hair?.color },
        { label: "Hair Type", value: me.hair?.type },
        { label: "Blood Group", value: me.bloodGroup },
      ],
    },
    {
      title: "Contact",
      iconPath: "mail",
      rows: [
        { label: "Email", value: me.email },
        { label: "Phone", value: me.phone },
        { label: "Username", value: me.username },
        { label: "IP Address", value: me.ip },
        { label: "MAC Address", value: me.macAddress },
        { label: "University", value: me.university },
      ],
    },
    {
      title: "Address",
      iconPath: "location",
      rows: [
        { label: "Street", value: me.address?.address },
        { label: "City", value: me.address?.city },
        { label: "State", value: me.address?.state },
        { label: "State Code", value: me.address?.stateCode },
        { label: "Postal Code", value: me.address?.postalCode },
        { label: "Country", value: me.address?.country },
        {
          label: "Coordinates",
          value: `${me.address?.coordinates?.lat}, ${me.address?.coordinates?.lng}`,
        },
      ],
    },
    {
      title: "Bank Details",
      iconPath: "bank",
      rows: [
        { label: "Card Type", value: me.bank?.cardType },
        { label: "Card Number", value: me.bank?.cardNumber },
        { label: "Expires", value: me.bank?.cardExpire },
        { label: "Currency", value: me.bank?.currency },
        { label: "IBAN", value: me.bank?.iban },
      ],
    },
    {
      title: "Company",
      iconPath: "company",
      rows: [
        { label: "Company Name", value: me.company?.name },
        { label: "Department", value: me.company?.department },
        { label: "Title", value: me.company?.title },
        { label: "Address", value: me.company?.address?.address },
        { label: "City", value: me.company?.address?.city },
        { label: "Country", value: me.company?.address?.country },
      ],
    },
    {
      title: "Crypto Wallet",
      iconPath: "crypto",
      rows: [
        { label: "Coin", value: me.crypto?.coin },
        { label: "Network", value: me.crypto?.network },
        {
          label: "Wallet Address",
          value: me.crypto?.wallet,
          mono: true,
        },
      ],
    },
    {
      title: "Security",
      iconPath: "security",
      rows: [
        { label: "EIN", value: me.ein },
        { label: "SSN", value: me.ssn },
        { label: "User Agent", value: me.userAgent, mono: true },
      ],
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
        <div className="h-32 bg-linear-to-br from-blue-100 via-purple-200 to-rose-200 dark:bg-linear-to-r dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4 gap-4">
            <img
              src={me.image}
              alt={me.username}
              className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover bg-gray-200 dark:bg-slate-600"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {me.firstName} {me.lastName}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                @{data?.me.username}
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${data?.me.role === "admin"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  }`}
              >
                {data?.me.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            iconPath={card.iconPath}
            rows={card.rows}
          />
        ))}
      </div>
    </div>
  );
}



export default Dashboard;
