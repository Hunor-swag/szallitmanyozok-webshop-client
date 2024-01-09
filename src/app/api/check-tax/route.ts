import { NextRequest, NextResponse } from 'next/server';

type MszszMember = {
  id: number;
  attributes: {
    name: string;
    tax_number: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const { tax } = await req.json();

    const res = await fetch(`http://127.0.0.1:1337/api/mszsz-members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    const members = data.data;

    const member = members.find(
      (member: any) =>
        member.attributes.tax_number.slice(0, 8) === tax.slice(0, 8)
    ) as MszszMember;

    if (!member) {
      return new NextResponse(JSON.stringify(null), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(member), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
