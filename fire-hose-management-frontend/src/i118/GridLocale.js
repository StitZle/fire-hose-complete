//TODO translate
//https://github.com/mui-org/material-ui-x/blob/HEAD/packages/grid/_modules_/grid/constants/localeTextConstants.ts
export const gridLocale = {
    //Export
    toolbarExport: "CSV-Export",
    toolbarExportLabel: "CSV-Export",
    toolbarExportCSV: "Als CSV-Datei herunterladen",

    // Columns selector toolbar button text
    toolbarColumns: "Spalten",
    toolbarColumnsLabel: "Spalten auswählen",

    // Columns panel text
    columnsPanelTextFieldLabel: "Spalte suchen",
    columnsPanelTextFieldPlaceholder: "Spaltentitel",
    columnsPanelDragIconLabel: "Spalte neu anordnen",
    columnsPanelShowAllButton: "Alles anzeigen",
    columnsPanelHideAllButton: "Alles ausblenden",

    // Filters toolbar button text
    toolbarFilters: "Filter",
    toolbarFiltersLabel: "Filter anzeigen",
    toolbarFiltersTooltipHide: "Filter ausblenden",
    toolbarFiltersTooltipShow: "Filter anzeigen",

    //Filter Panel
    filterPanelAddFilter: "Filter hinzufügen",
    filterPanelDeleteIconLabel: "Löschen",
    filterPanelOperators: "Operator",
    filterPanelOperatorAnd: "Und",
    filterPanelOperatorOr: "Oder",
    filterPanelColumns: "Spalten",
    filterPanelInputLabel: "Wert",
    filterPanelInputPlaceholder:  "Filterwert",

    //Filter
    filterOperatorContains: "enthält",
    filterOperatorEquals: "ist gleich",
    filterOperatorStartsWith: "beginnt mit",
    filterOperatorEndsWith: "endet mit",
    filterOperatorIs: "ist",
    filterOperatorNot: "ist nicht",
    filterOperatorAfter: "ist nach",
    filterOperatorOnOrAfter: "ist an oder nach",
    filterOperatorBefore: "is before",
    filterOperatorOnOrBefore: "is on or before",

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} ausgewählte Zeilen`
            : `${count.toLocaleString()} ausgewählte Zeile`,

    // Total rows footer text
    footerTotalRows: 'Total Rows:',
}