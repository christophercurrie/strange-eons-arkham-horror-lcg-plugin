// The plug-in's name, description, version and game language, and its
// images by name.
//
// Module: returns { name, description, version, locale, image }.
define(['se/common', 'se/imageutils', 'se/java', 'se/strings'], function (
    common,
    imageutils,
    Java,
    strings
) {
    const Properties = Java.type('java.util.Properties');

    function name() {
        return strings.string('AHLCG');
    }

    function description() {
        return strings.string('AHLCG-Description');
    }

    var seVersion;

    // the build's version as SE compares it: 10.0.0-SNAPSHOT is 10.0
    function version() {
        if (seVersion === undefined) {
            var props = new Properties();
            var input = common.ResourceKit.getInputStream(
                'ArkhamHorrorLCG/version.properties'
            );
            try {
                props.load(input);
            } finally {
                input.close();
            }
            seVersion = parseFloat(String(props.getProperty('se-version')));
        }
        return seVersion;
    }

    // the game language, without its country
    function locale() {
        return String(common.Language.getGameLocale()).split('_')[0];
    }

    // ArkhamHorrorLCG/[folder/]resource.ext, a jp2 by default
    function image(resource, folder, ext) {
        if (ext === undefined) ext = 'jp2';
        var path = 'ArkhamHorrorLCG/';
        if (folder !== undefined && folder.length > 0) path += folder + '/';
        return imageutils.ImageUtils.get(path + resource + '.' + ext);
    }

    return {
        name: name,
        description: description,
        version: version,
        locale: locale,
        image: image,
    };
});
