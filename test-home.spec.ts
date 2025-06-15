import { test, expect } from '@playwright/test';

test.describe('메인 페이지', () => {
  test('팝업이 정상적으로 노출되고 닫을 수 있다', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // 팝업 타이틀이 보이는지 확인
    await expect(page.getByRole('heading')).toBeVisible();

    // '오늘 하루 열지 않기' 체크박스 클릭
    const dontShowCheckbox = page.getByLabel('오늘 하루 열지 않기');
    await dontShowCheckbox.check();
    await expect(dontShowCheckbox).toBeChecked();

    // 닫기 버튼 클릭
    await page.getByLabel('닫기').click();

    // 팝업이 사라졌는지 확인
    await expect(page.getByRole('heading')).not.toBeVisible();
  });

  test('소송안내, 소송진행하기 버튼 클릭 시 이동', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // 소송안내 버튼 클릭
    await page.getByRole('button', { name: '소송안내' }).click();
    await expect(page).toHaveURL(/\/lawsuit\/guide/);

    // 메인으로 다시 이동
    await page.goto('http://localhost:3000/');

    // 소송진행하기 버튼 클릭
    await page.getByRole('button', { name: '소송진행하기' }).click();
    await expect(page).toHaveURL(/\/lawsuit/);
  });
}); 