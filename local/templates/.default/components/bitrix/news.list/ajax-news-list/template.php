<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
    $arResponse = [
            getNextPage(
                $arResult,
                $_GET['PAGEN_1'],
                '/utils/get-next-news-page.php?PAGEN_1=')
    ];

    foreach ($arResult['ITEMS'] as $arItem) {
        $this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
        $this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));

        $arr = [
            'ID' => $this->GetEditAreaId($arItem['ID']),
            'DETAIL_PAGE_URL' => $arItem["DETAIL_PAGE_URL"],
            'PICTURE_SRC' => $arItem['PREVIEW_PICTURE']['SRC'],
            'DATE' => normalizeDate($arItem["DISPLAY_ACTIVE_FROM"]),
            'TEXT' => $arItem["PREVIEW_TEXT"],
        ];

        $arResponse[] = $arr;
    };
?>

<!--RestartBuffer--><?
    $JSON__DATA = defined('JSON_UNESCAPED_UNICODE')
        ? json_encode($arResponse, JSON_UNESCAPED_UNICODE)
        : json_encode($arResponse);
    echo $JSON__DATA;
?><!--RestartBuffer-->