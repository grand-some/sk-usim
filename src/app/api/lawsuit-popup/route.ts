import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'lawsuitPopup.json')

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (e) {
    // 파일이 없으면 기본값 반환
    return NextResponse.json({
      title: '소송 제출 안내',
      content: '소송 제출을 원하시나요? 소송 제출 페이지로 이동하시겠습니까?'
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
} 