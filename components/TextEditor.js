import AceEditor from "react-ace";
// import * as ace from 'ace-builds/src-noconflict/ace';
import ace from "ace-builds";
// import "ace-builds/src-noconflict/mode-html";
// import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
// import 'ace-builds/webpack-resolver'

ace.config.setDefaultValue("session", "useWorker", false);
ace.config.loadModule = function(moduleName, onLoad) {
    var module, moduleType;
    if (Array.isArray(moduleName)) {
        moduleType = moduleName[0];
        moduleName = moduleName[1];
    }
    var done = m=>{
        // console.log(moduleName, "loaded")
        onLoad && onLoad(m)
    };
    // console.log(moduleName)
    var parts = moduleName.split("/");
    if (parts[1] == "ext") {
        import(`ace-builds/src-noconflict/ext-${parts[2]}`).then(done);
    } else if (parts[1] == "theme") {
        import(`ace-builds/src-noconflict/theme-${parts[2]}`).then(done);
    } else if (parts[1] == "mode") {
        import(`ace-builds/src-noconflict/mode-${parts[2]}`).then(done);
    } else if (parts[1] == "keyboard") {
        import(`ace-builds/src-noconflict/keybinding-${parts[2]}`).then(done);
    } else if (parts[1] == "snippets") {
        import(`ace-builds/src-noconflict/snippets/${parts[2]}`).then(done);
    } else {
        console.error(moduleName, "not implemented")
    }
}

const TextEditor = (props) => {
    return (
        <div>
            <AceEditor
                placeholder="Placeholder Text"
                mode={props.language}
                theme="monokai"
                name="html"
                // onLoad={this.onLoad}
                onChange={props.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={props.code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                height='70vh'
                width='100%'
            />
        </div>
    )
}

export default TextEditor