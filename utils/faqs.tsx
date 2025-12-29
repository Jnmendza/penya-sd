import { ReactNode } from "react";

export const faqs: {
  id: number;
  question: string;
  answer: string | ReactNode;
}[] = [
  {
    id: 1,
    question: "Do I need to be a member to watch games?",
    answer:
      "No! Everyone is welcome to watch matches with us at Novo Brazil Brewing. Membership is optional but supports the Penya and gets you exclusive merch and perks.",
  },
  {
    id: 2,
    question: "Are kids allowed at the watch parties?",
    answer:
      "Absolutely. Novo Brazil Otay Ranch is a family-friendly venue. We have many members who bring their children to enjoy the matches.",
  },
  {
    id: 3,
    question: "What are the benefits of membership?",
    answer: (
      <>
        <p>
          Becoming a Penyista is more than just joining a club; it is your
          official connection to FC Barcelona. As a recognized member, you
          receive:
        </p>
        <ul className='list-disc space-y-2 pl-5 mt-2'>
          <li>
            <strong>Official Recognition:</strong> Direct connection to the FC
            Barcelona Confederation of Penyes worldwide.
          </li>
          <li>
            <strong>Match Access:</strong> Priority access to tickets for home
            matches at Camp Nou, away games, Clásicos, and Champions League
            fixtures.
          </li>
          <li>
            <strong>Exclusive Events:</strong> Invitations to private watch
            parties, community service events, and international Penya
            gatherings.
          </li>
          <li>
            <strong>Travel Experiences:</strong> Organized group trips to
            Barcelona and opportunities for behind-the-scenes visits (Museum,
            Training Facilities).
          </li>
          <li>
            <strong>Merch & Perks:</strong> Access to official Penya
            merchandise, special scarves/pins, and discounts with local
            partners.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    question: "How do I pick up my membership merch?",
    answer:
      "Merch is available for pickup at any matchday event. Just find a board member (look for the people checking in members), show your confirmation email, and we'll get you sorted!",
  },
];
